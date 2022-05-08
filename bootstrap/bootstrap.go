package bootstrap

import (
	"fmt"
	"github.com/google/wire"
	"github.com/nats-io/nats.go"
	"github.com/nats-io/nkeys"
	"github.com/weplanx/transfer"
	"github.com/weplanx/worker/common"
	"go.uber.org/zap"
	"strings"
	"time"
)

var Provides = wire.NewSet(
	UseZap,
	UseNats,
	UseJetStream,
	UseTransfer,
)

func UseZap(values *common.Values) (log *zap.Logger, err error) {
	if values.Debug {
		if log, err = zap.NewDevelopment(); err != nil {
			return
		}
	} else {
		if log, err = zap.NewProduction(); err != nil {
			return
		}
	}
	return
}

func UseNats(values *common.Values) (nc *nats.Conn, err error) {
	var kp nkeys.KeyPair
	if kp, err = nkeys.FromSeed([]byte(values.Nats.Nkey)); err != nil {
		return
	}
	defer kp.Wipe()
	var pub string
	if pub, err = kp.PublicKey(); err != nil {
		return
	}
	if !nkeys.IsValidPublicUserKey(pub) {
		return nil, fmt.Errorf("nkey 验证失败")
	}
	if nc, err = nats.Connect(
		strings.Join(values.Nats.Hosts, ","),
		nats.MaxReconnects(5),
		nats.ReconnectWait(2*time.Second),
		nats.ReconnectJitter(500*time.Millisecond, 2*time.Second),
		nats.Nkey(pub, func(nonce []byte) ([]byte, error) {
			sig, _ := kp.Sign(nonce)
			return sig, nil
		}),
	); err != nil {
		return
	}
	return
}

func UseJetStream(nc *nats.Conn) (nats.JetStreamContext, error) {
	return nc.JetStream(nats.PublishAsyncMaxPending(256))
}

func UseTransfer(values *common.Values, js nats.JetStreamContext) (client *transfer.Transfer, err error) {
	if client, err = transfer.New(values.Namespace, js); err != nil {
		return nil, err
	}
	if err = client.Set("schedules", transfer.Option{
		Topic:       "schedules",
		Description: "定时调度日志",
	}); err != nil {
		return
	}
	return
}

// Code generated by Wire. DO NOT EDIT.

//go:generate go run github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package main

import (
	"github.com/weplanx/worker/app"
	"github.com/weplanx/worker/bootstrap"
	"github.com/weplanx/worker/common"
)

// Injectors from wire.go:

func App(value *common.Values) (*app.App, error) {
	logger, err := bootstrap.UseZap(value)
	if err != nil {
		return nil, err
	}
	conn, err := bootstrap.UseNats(value)
	if err != nil {
		return nil, err
	}
	jetStreamContext, err := bootstrap.UseJetStream(conn)
	if err != nil {
		return nil, err
	}
	transfer, err := bootstrap.UseTransfer(value, jetStreamContext)
	if err != nil {
		return nil, err
	}
	inject := &common.Inject{
		Values:   value,
		Log:      logger,
		Js:       jetStreamContext,
		Transfer: transfer,
	}
	appApp, err := app.New(inject)
	if err != nil {
		return nil, err
	}
	return appApp, nil
}

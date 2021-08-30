package app

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/google/wire"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
	"lab-serverless/app/scf"
	"lab-serverless/common"
	"time"
)

var Provides = wire.NewSet(
	HttpServer,
	InitializeDatabase,
	scf.Provides,
	NewApp,
)

type App struct {
	*gin.Engine
}

func NewApp(
	r *gin.Engine,
	_ *scf.Routes,
) *App {
	return &App{Engine: r}
}

// HttpServer 启动 Gin HTTP 服务
// 配置文档 https://gin-gonic.com/docs/examples/custom-http-config
func HttpServer(config common.Config) (serve *gin.Engine) {
	serve = gin.New()
	serve.Use(gin.Logger())
	serve.Use(gin.Recovery())
	serve.Use(cors.New(cors.Config{
		AllowOrigins:     config.Cors,
		AllowMethods:     []string{"POST"},
		AllowHeaders:     []string{"Origin", "CONTENT-TYPE"},
		AllowCredentials: true,
		MaxAge:           2 * time.Hour,
	}))
	return
}

// InitializeDatabase 初始化数据库
// 配置文档 https://gorm.io/docs/connecting_to_the_database.html
func InitializeDatabase(config common.Config) (db *gorm.DB, err error) {
	option := config.Database
	db, err = gorm.Open(postgres.Open(option.Dsn), &gorm.Config{
		SkipDefaultTransaction: true,
		PrepareStmt:            true,
		NamingStrategy: schema.NamingStrategy{
			TablePrefix:   option.TablePrefix,
			SingularTable: true,
		},
	})
	if err != nil {
		return
	}
	sqlDB, err := db.DB()
	if err != nil {
		return
	}
	if option.MaxIdleConns != 0 {
		sqlDB.SetMaxIdleConns(option.MaxIdleConns)
	}
	if option.MaxOpenConns != 0 {
		sqlDB.SetMaxOpenConns(option.MaxOpenConns)
	}
	if option.ConnMaxLifetime != 0 {
		sqlDB.SetConnMaxLifetime(time.Second * time.Duration(option.ConnMaxLifetime))
	}
	return
}

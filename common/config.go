package common

type Config struct {
	App      App
	Database Database
	Cors     []string `env:"CORS" envSeparator:","`
}

type App struct {
	Name string `env:"APP_NAME"`
	Key  string `env:"APP_KEY"`
}

type Database struct {
	Dsn             string `env:"DB_DSN"`
	MaxIdleConns    int    `env:"DB_MAX_IDLE_CONNS" envDefault:"5"`
	MaxOpenConns    int    `env:"DB_MAX_OPEN_CONNS" envDefault:"10"`
	ConnMaxLifetime int    `env:"DB_CONN_MAX_LIFETIME" envDefault:"3600"`
}

package main

import "log"

func main() {
	app, err := App()
	if err != nil {
		log.Fatalln(err)
	}
	app.Run()
}

package main

import (
	"server/src/graphql/fields"
	"github.com/graphql-go/graphql"
	"github.com/friendsofgo/graphiql"
	gqlHandler "github.com/graphql-go/graphql-go-handler"
	"net/http"
	"log"
	"fmt"
)

func main() {
	rootQuery := graphql.ObjectConfig{Name: "RootQuery", Fields: fields.RootFields}
	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}
	schema, err := graphql.NewSchema(schemaConfig)

	if err != nil {
		log.Fatalf("failed to create new schema, error: %v", err)
	}

	graphqlHandler := gqlHandler.New(&gqlHandler.Config{
		Schema: &schema,
		Pretty: true,
	})

	graphiqlHandler, err := graphiql.NewGraphiqlHandler("/graphql")
	if err != nil {
		panic(err)
	}


	http.Handle("/graphql", graphqlHandler)
	http.Handle("/graphiql", graphiqlHandler)

	fmt.Println("Now server is running on port 8080")
	http.ListenAndServe(":8080", nil)
}

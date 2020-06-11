package resolvers

import (
	"server/src/graphql/types"
	"github.com/graphql-go/graphql"
)

// UserResolver resolves a user query
func UserResolver(params graphql.ResolveParams) (interface{}, error) {
	return types.User{
		ID: 123,
		FirstName: "Julio",
		LastName: "Assis",
		Age: 23,
	}, nil
}

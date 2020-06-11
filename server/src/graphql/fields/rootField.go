package fields

import (
	"github.com/graphql-go/graphql"
	"server/src/graphql/types"
	"server/src/graphql/resolvers"
)

// RootFields holds the graphql root queries
var RootFields = graphql.Fields{
	"user": &graphql.Field{
		Type: types.UserType,
		Resolve: resolvers.UserResolver,
	},
}

import { gql } from "@apollo/client";

export const GET_CONTENT = gql`
  query getContentQuery {
    posts(where: { id: 22 }) {
      nodes {
        title
          front_page {
              telcall
              telwt
        }
      }
    }
  }
`;

export const GET_ALL_NEWS = gql`
    query getAllNewsQuery {
        posts(where: {categoryId: 78}) {
            nodes {
                title
                databaseId
                date
                excerpt
                featuredImage {
                    node {
                        sourceUrl(size: THUMBNAIL)
                    }
                }
            }
        }
    }
`;

export const GET_ALL_ADVS = gql`
    query getAllNewsQuery {
        posts(where: {categoryId: 82}) {
            nodes {
                title
                databaseId
                date
                excerpt
            }
        }
    }
`;

export const GET_POST_BY_ID = gql`
    query getPostByIDQuery($id: ID!) {
        post(id: $id, idType: DATABASE_ID) {
            date
            title
            content(format: RENDERED)
        }
    }
`

export const GET_CATEGORIES = gql`
    query getCategoriesQuery {
        productCategories(where: {hideEmpty: true},last: 100) {
            nodes {
                id
                name
                slug
                productCategoryId
            }
        }
    }
`;

export const GET_CATEGORY_BY_ID = gql`
    query getCategoryQuery($id: ID!) {
        productCategory(id: $id, idType: DATABASE_ID) {
            id
            name
            slug
        }
    }
`

export const GET_PRODUCTS_BY_CATID = gql`
    query getProductsQuery($categoryId: Int ) {
        products(where: {categoryId: $categoryId}, last: 100) {
            nodes {
                id
                databaseId
                name
                productsacf {
                    measures
                    packs
                }
            }
        }
    }
`;

export const GET_TOKEN = gql`
    mutation LoginUser($password: String!, $username: String!) {
        login(
            input: {clientMutationId: "uniqueId", username: $username, password: $password}
        ) {
            authToken
            user {
                databaseId
                id
                name
                email
                lastName
                username
                wooSessionToken
            }
        }
    }
`;

export const GET_USER_INFO = gql`
    query userInfoQuery {
        viewer {
            email
            firstName
            lastName
        }
    }
`

export const CREATE_ORDER = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            clientMutationId
            order {
                id
                status
                customer {
                    displayName
                }
            }
        }
    }
`

export const GET_MY_ORDERS = gql`
    query getMyOrders($customerId: Int!) {
        customer(customerId: $customerId) {
            orders(first: 10) {
                nodes {
                    date
                    lineItems {
                        nodes {
                            product {
                                node {
                                    name
                                    productsacf {
                                        measures
                                        packs
                                    }
                                }
                            }
                            quantity
                        }
                    }
                }
            }
        }
    }
`

export const GET_ALL_ORDERS = gql`
    query getAllOrders($day: Int = 5, $month: Int = 8) {
        orders(where: {dateQuery: {month: $month, day: $day}}) {
            nodes {
                date
                databaseId
                status
                lineItems {
                    nodes {
                        databaseId
                        product {
                            node {
                                name
                                productsacf {
                                    measures
                                    packs
                                }
                                databaseId
                            }
                        }
                        quantity
                    }
                }
                customer {
                    firstName
                    lastName
                }
            }
        }
    }
`

export const GET_NEW_ORDERS = gql`
    query getAllOrders($day: Int = 5, $month: Int = 8) {
        orders(where: {dateQuery: {month: $month, day: $day}}) {
            nodes {
                databaseId
                status
            }
        }
    }
`

export const UPDATE_ORDER_STATUS = gql`
    mutation UpdateOrder($input: UpdateOrderInput!) {
      updateOrder(input: $input) {
        order {
          status
        }
      }
}
`

//{ "input": { "orderId": 84808, "status": "FAILED" } }

const BACKEND_URL : string = 'http://localhost:3001/graphql';

//GRAPHQL FETCH FACTORY
async function graphqlRequest(query: String, variables={}) {

  const request = {
    method: 'POST',
    headers: {'content-type':'application/json'},
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  };
  const response = await fetch(BACKEND_URL, request)
  const responseBody = await response.json();
  return responseBody.data;
}

export async function getCompanyDetails(id: any) {
  const query = `
    query($id:ID!){
      companyDetails(id:$id){
        name
        address
        primaryColor
        secondaryColor
        logoUrl
      }
    }
  `;
  const data = await graphqlRequest(query, {id:id});
  return data;
}


export async function getReports(id: any) {
  const query = `
    query($id:ID!){
      companyReports(id:$id){
        id
        title
        tags
        shortDesc
        longDesc
        steps
        images
        user {
          id
          name
          email
        }
        company {
          id
          name
        }
      }
    }
  `;
  const data = await graphqlRequest(query, {id:id});
  return data;
}

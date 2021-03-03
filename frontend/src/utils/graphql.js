//reportDetail Query

//{"id":"603d1e387b3ac67c1884c417"}

// query($id:ID!){
//   reportDetail(id:$id) {
//     title
//     tags
//     longDesc
//     user {
//       name
//     }
//     company {
//       name
//       users {
//         name
//       }
//     }
//   }
// }

//companyReports

//{"id":"603e290157b43632405647f4"}

// query($id:ID!){
//   companyReports(id:$id){
    
//     title
    
//     user {
//       name
//       reports {
//         title
//       }
//     }

//   }
// }
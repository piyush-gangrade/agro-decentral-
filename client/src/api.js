// export async function loginUser(creds){
//     console.log(creds)
//     const res = await fetch("/login", 
//             { method: "POST", body: JSON.stringify(creds)})
//     const data = await res.json();
//     console.log(data)
//     // if(!res.ok){
//         // thrown{
//         //     message: data.message,
//         //     statusText: res.statusText,
//         //     status: res.status
//         // }
//     // }
//     return data;
// }
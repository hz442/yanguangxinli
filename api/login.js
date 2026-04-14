export async function onRequestPost(context) {
  const {user,pwd} = await context.request.json()
  const adminUser = 'admin'       // 你可以修改
  const adminPwd = '123456'       // 请修改为强密码
  if(user===adminUser && pwd===adminPwd){
    return Response.json({success:true,token:'admin-'+Date.now()})
  }
  return Response.json({success:false})
}

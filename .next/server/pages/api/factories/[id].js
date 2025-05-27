"use strict";(()=>{var e={};e.id=939,e.ids=[939],e.modules={9424:e=>{e.exports=require("mssql")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},6533:(e,t,r)=>{r.r(t),r.d(t,{config:()=>l,default:()=>u,routeModule:()=>f});var n={};r.r(n),r.d(n,{default:()=>c});var a=r(1802),o=r(7153),s=r(6249),i=r(9077);async function c(e,t){let{id:r}=e.query;try{switch(e.method){case"GET":let n=await (0,i.fw)(parseInt(r));if(!n)return t.status(404).json({error:"找不到此廠區"});return t.status(200).json(n);case"PUT":let a=await (0,i.C$)(parseInt(r),e.body);return t.status(200).json(a);case"DELETE":if(!await (0,i.lT)(parseInt(r)))return t.status(404).json({error:"找不到此廠區"});return t.status(200).json({message:"廠區已刪除"});default:return t.setHeader("Allow",["GET","PUT","DELETE"]),t.status(405).json({error:`不支援 ${e.method} 方法`})}}catch(e){return console.error("API Error:",e),t.status(500).json({error:"操作失敗",message:"請稍後再試"})}}let u=(0,s.l)(n,"default"),l=(0,s.l)(n,"config"),f=new a.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/factories/[id]",pathname:"/api/factories/[id]",bundlePath:"",filename:""},userland:n})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)},9077:(e,t,r)=>{r.d(t,{ZP:()=>u,lT:()=>i,fw:()=>o,EE:()=>c,C$:()=>s});var n=r(9424);require("dotenv").config({path:".env.local"});let a={server:process.env.DB_SERVER||"cfmclouddb.c3sw88geq0el.ap-southeast-2.rds.amazonaws.com",database:process.env.DB_DATABASE||"CFMdatabase",user:process.env.DB_USER||"Edison",password:process.env.DB_PASSWORD||"Edison0528",port:parseInt(process.env.DB_PORT||"1433"),options:{encrypt:!0,trustServerCertificate:!0,enableArithAbort:!0}};async function o(e){let t;try{return t=await new n.ConnectionPool(a).connect(),(await t.request().input("id",n.Int,e).query(`
        SELECT * FROM factories 
        WHERE factory_id = @id
      `)).recordset[0]}catch(e){throw console.error("Database Error:",e),Error("獲取廠區資料失敗")}finally{t&&await t.close()}}async function s(e,t){let r;try{return r=await new n.ConnectionPool(a).connect(),(await r.request().input("id",n.Int,e).input("factory_name",n.NVarChar(100),t.factory_name).input("location",n.NVarChar(200),t.location).input("status",n.VarChar(20),t.status).input("carbon_emissions",n.Decimal(10,2),t.carbon_emissions).input("energy_consumption",n.Decimal(10,2),t.energy_consumption).input("efficiency_rate",n.Decimal(5,2),t.efficiency_rate).query(`
        UPDATE factories 
        SET 
          factory_name = @factory_name,
          location = @location,
          status = @status,
          carbon_emissions = @carbon_emissions,
          energy_consumption = @energy_consumption,
          efficiency_rate = @efficiency_rate,
          updated_at = GETDATE()
        WHERE factory_id = @id;
        
        SELECT * FROM factories WHERE factory_id = @id;
      `)).recordset[0]}catch(e){throw console.error("Database Error:",e),Error("更新廠區資料失敗")}finally{r&&await r.close()}}async function i(e){let t;try{return t=await new n.ConnectionPool(a).connect(),(await t.request().input("id",n.Int,e).query(`
        DELETE FROM factories 
        WHERE factory_id = @id;
        
        SELECT @@ROWCOUNT as deleted;
      `)).recordset[0].deleted>0}catch(e){throw console.error("Database Error:",e),Error("刪除廠區失敗")}finally{t&&await t.close()}}async function c(){let e;try{return e=await new n.ConnectionPool(a).connect(),(await e.request().query(`
      SELECT 
        COUNT(*) as total_factories,
        SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as active_factories,
        SUM(carbon_emissions) as total_emissions,
        AVG(carbon_emissions) as avg_emissions,
        SUM(energy_consumption) as total_energy,
        AVG(energy_consumption) as avg_energy,
        AVG(efficiency_rate) as avg_efficiency
      FROM factories;
    `)).recordset[0]}catch(e){throw console.error("Database Error:",e),Error("獲取統計資料失敗")}finally{e&&await e.close()}}let u=a}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=6533);module.exports=r})();
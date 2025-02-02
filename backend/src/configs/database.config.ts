import { Sequelize } from "sequelize";

const sequelize:any = new Sequelize("postgresql://postgres.axghnpixplnmahgchrxt:8sBJ5bEZBU9g5HM0@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",{
  // database: "library", 
  // username: "postgres", 
  // password: "postgres", 
  // host: , // or your remote DB host
  dialect: "postgres",
  logging: false, // Set to true if you want to see SQL logs
});

  const connection = async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ force: true }).then((e:any)=> {
          console.log(e)}).catch((e:any) =>{console.log(e)})
        console.log('Database synched')
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }


export default sequelize;

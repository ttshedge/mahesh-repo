import { Sequelize } from "sequelize";

const sequelize:any = new Sequelize("postgresql://mahesh:Ev9tm4PIM93A9c6GcyXtxTHK8HQsiWVE@dpg-cu0vl9l2ng1s73e40ej0-a.singapore-postgres.render.com/mahesh_db",{
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

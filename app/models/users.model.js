
module.exports = mongoose => {
   
    const schema = mongoose.Schema(
      {
        userName: String,
        email: String,
        password: String,
        isAdmin: Boolean
      },
      {timestamps: true}
     );
     schema.method('toJSON',function(){
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
     });
     const Users = mongoose.model("users", schema);
  
    return Users;
  };
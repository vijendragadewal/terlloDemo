
module.exports = mongoose => {
   
    const schema = mongoose.Schema(
      {
        status: String,
        description: String,
        projectId:{ type:  mongoose.Schema.Types.ObjectId,
        ref:'projects'},
        assignUsers: [{
            type:  mongoose.Schema.Types.ObjectId,
            ref:'users'
        }]
      },
      {timestamps: true}
     );
     schema.method('toJSON',function(){
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
     });
     const Tickets = mongoose.model("tickets", schema);
  
    return Tickets;
  };
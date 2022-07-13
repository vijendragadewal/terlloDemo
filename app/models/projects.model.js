
module.exports = mongoose => {
   
    const schema = mongoose.Schema(
      {
        projectName: String,
        description: String,
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
     const Projects = mongoose.model("projects", schema);
  
    return Projects;
  };
class EnvConfig {

  static port = process.env.PORT;
  static ollamaModel = process.env.OLLAMA_MODEL; 


}

module.exports={
    EnvConfig
}
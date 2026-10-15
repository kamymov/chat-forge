class EnvConfig {

  static port = process.env.PORT;
  static ollamaModel = process.env.OLLAMA_MODEL; 
  static ollamaEmbeddingModel = process.env.OLLAMA_EMBEDDING_MODEL;

  


}

module.exports={
    EnvConfig
}
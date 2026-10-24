class EnvConfig {

  static port = process.env.PORT;
  static ollamaModel = process.env.OLLAMA_MODEL; 
  static ollamaEmbeddingModel = process.env.OLLAMA_EMBEDDING_MODEL;
  static ollamaHost = process.env.CHROMA_URL_HOST;
  static ollamaPort = process.env.CHROMA_PORT;
  


}

module.exports={
    EnvConfig
}
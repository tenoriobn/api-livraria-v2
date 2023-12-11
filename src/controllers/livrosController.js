import livros from "../models/Livro.js";

class LivroController {
  static async listarLivros (req, res) {
    try {
      const listaLivros = await livros.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findById(id).populate("autor", "nome").exec();

      res.status(200).send(livroResultado);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do livro não localizado.`});
    }
  };

  static async cadastrarLivro (req, res) {
    try {
      const novoLivro = await livros.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;

      const livrosEncontrados = await livros.find({ "editora": editora }).exec();
      res.status(200).send(livrosEncontrados);
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };



}

export default LivroController;
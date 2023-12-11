import livros from "../models/Livro.js";

class LivroController {
  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livros.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livros.findById(id).populate("autor", "nome").exec();

      if (livroResultado != null) {
        res.status(200).send(livroResultado);
      } else {
        res.status(404).send({message: "Id do Livro não localizado."});
      }

      // res.status(200).send(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarLivro (req, res, next) {
    try {
      const novoLivro = await livros.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;

      const livrosEncontrados = await livros.find({ "editora": editora }).exec();
      res.status(200).send(livrosEncontrados);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
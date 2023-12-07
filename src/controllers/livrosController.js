import livros from "../models/Livro.js";

class LivroController {

  static async listarLivros (req, res) {
    try {
      const listaLivros = await livros.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static listarLivroPorId = (req, res) => {
    const id = req.params.id;

    livros.findById(id)
      .populate('autor', 'nome')
      .exec((err, livros) => {
      if(err) {
        res.status(400).send({message: `${err.message} - Id do livro não localizado.`})
      } else {
        res.status(200).send(livros);
      }
    })
  }

  static async cadastrarLivro (req, res) {
    try {
      const novoLivro = await livros.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novoLivro });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
    }
  }

  static atualizarLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Livro atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static excluirLivro = (req, res) => {
    const id = req.params.id;

    livros.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Livro removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora

    livros.find({'editora': editora}, {}, (err, livros) => {
      res.status(200).send(livros);

    })
  }



}

export default LivroController
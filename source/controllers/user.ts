import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import IUser from '../interfaces/user';
import IProject from '../interfaces/project';
import IPiso from '../interfaces/piso';
import IMySQLResult from '../interfaces/result';
import { createConnection } from 'mysql';
import { sign } from 'jsonwebtoken';
import { connect } from '../routes/user';

const NAMESPACE = 'User';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized');

    return res.status(200).json({
        message: 'Authorized'
    });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { nome, email, senha } = req.body;

    bcryptjs.hash(senha, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            });
        }

        let emailCheck = `SELECT email FROM usuario WHERE email = "${email}"`;

        Connect().then((connection) => {
            Query<String>(connection, emailCheck).then((notUnique) => {
                if (notUnique.length > 0) {
                    logging.info(NAMESPACE, `E-mail ${email} is already being used`);

                    return res.status(400).json({
                        message: 'The e-mail you are trying to register is already in use'
                    });
                } else {
                    let query = `INSERT INTO usuario (nome, email, senha) VALUES ("${nome}", "${email}", "${hash}")`;
                    Connect()
                        .then((connection) => {
                            Query<IMySQLResult>(connection, query)
                                .then((result) => {
                                    logging.info(NAMESPACE, `User with id ${result.insertId} inserted`);

                                    return res.status(201).json(result);
                                })
                                .catch((error) => {
                                    logging.error(NAMESPACE, error.message, error);
                                    return res.status(500).json({
                                        message: error.message,
                                        error
                                    });
                                });
                        })
                        .catch((error) => {
                            logging.error(NAMESPACE, error.message, error);
                            return res.status(500).json({
                                message: error.message,
                                error
                            });
                        });
                }
            });
        });
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { email, senha } = req.body;
    let logged;

    console.log(req.headers.cookie);

    let query = `SELECT * FROM usuario WHERE email = "${email}"`;

    Connect()
        .then((connection) => {
            Query<IUser[]>(connection, query)
                .then((users) => {
                    try {
                        if (Array.from(users).length > 0) {
                            bcryptjs.compare(senha, users[0].senha, (error, result) => {
                                if (error) {
                                    return res.status(401).json({
                                        message: 'Password mismatch'
                                    });
                                } else if (result) {
                                    signJWT(users[0], (_error, token) => {
                                        if (_error) {
                                            return res.status(401).json({
                                                message: 'Unable to sign JWT',
                                                error: _error
                                            });
                                        } else if (token) {
                                            console.log(token);
                                            return res.status(200).json({
                                                message: 'Auth Successful',
                                                token,
                                                user: users[0]
                                            });
                                        }
                                    });
                                } else {
                                    return res.status(401).json({
                                        message: 'Password mismatch'
                                    });
                                }
                            });
                        } else {
                            res.status(400).json({ message: 'usuário não encontrado' });
                        }
                    } catch (e) {
                        console.error(e);
                    }
                })

                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    let query = `SELECT id_usuario, nome, email, senha FROM usuario`;

    Connect()
        .then((connection) => {
            Query<IUser[]>(connection, query)
                .then((users) => {
                    return res.status(200).json({
                        users,
                        count: users.length
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
    let { id_usuario } = req.body;

    let query = `SELECT * FROM projeto WHERE usuario_fk = '${id_usuario}'`;

    Connect()
        .then((connection) => {
            Query<IProject[]>(connection, query)
                .then((projects) => {
                    return res.status(200).json({
                        projects,
                        count: projects.length
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getProject = async (req: Request, res: Response, next: NextFunction) => {
    let { id_projeto } = req.body;

    let query = `SELECT * FROM projeto WHERE id_projeto = '${id_projeto}'`;

    Connect()
        .then((connection) => {
            Query<IProject[]>(connection, query)
                .then((projects) => {
                    return res.status(200).json({
                        projects,
                        count: projects.length
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);
                    return res.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.body;

    let query = `DELETE FROM usuario WHERE id_usuario = ${id}`;

    Connect().then((connection) => {
        Query(connection, query)
            .then(() => {
                return res.status(200).json({
                    message: 'Usuário excluído com sucesso'
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.body;

    let query = `DELETE FROM projeto WHERE id_projeto = ${id}`;

    Connect().then((connection) => {
        Query(connection, query)
            .then(() => {
                return res.status(200).json({
                    message: 'Projeto excluído com sucesso'
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let { id, nome, email } = req.body;

    let query = `UPDATE usuario SET nome='${nome}', email='${email}' WHERE id_usuario=${id}`;

    Connect().then((connection) => {
        Query<IUser>(connection, query)
            .then((user) => {
                return res.status(200).json({
                    user
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const createProject = async (req: Request, res: Response, next: NextFunction) => {
    let { usuario_fk } = req.body;

    let query = `INSERT INTO 
                    projeto (usuario_fk)
                VALUES
                    ('${usuario_fk}')`;

    Connect().then((connection) => {
        Query<IProject>(connection, query)
            .then((project) => {
                return res.status(200).json({
                    project
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    let { id, lado_a, lado_b, lado_c, lado_d, altura, material_parede, cimento, 
        tipo_piso, tamanho_piso, argamassa, material_telhado,
        ondas_telhado, tipo_acabamento, titulo_projeto
    } = req.body;

    let query = `UPDATE 
                    projeto 
                SET 
                    titulo_projeto = '${titulo_projeto}',
                    lado_a = '${lado_a}',
                    lado_b = '${lado_b}',
                    lado_c = '${lado_c}',
                    lado_d = '${lado_d}',
                    altura = '${altura}',
                    material_telhado = '${material_telhado}',
                    ondas_telhado = '${ondas_telhado}',
                    material_parede = '${material_parede}',
                    cimento = '${cimento}',
                    tipo_piso = '${tipo_piso}',
                    tamanho_piso = '${tamanho_piso}',
                    argamassa = '${argamassa}',
                    tipo_acabamento = '${tipo_acabamento}'
                WHERE 
                    id_projeto='${id}'`;

    Connect().then((connection) => {
        Query<IProject>(connection, query)
            .then((project) => {
                return res.status(200).json({
                    project
                });
            })
            .catch((error) => {
                logging.error(NAMESPACE, error.message, error);
                return res.status(500).json({
                    message: error.message,
                    error
                });
            });
    });
};

export default {
    validateToken,
    register,
    login,
    getAllUsers,
    getAllProjects,
    getProject,
    deleteUser,
    deleteProject,
    updateUser,
    createProject,
    updateProject
};

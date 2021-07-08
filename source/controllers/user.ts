import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';
import IUser from '../interfaces/user';
import IMySQLResult from '../interfaces/result';
import { createConnection } from 'mysql';
import { sign } from 'jsonwebtoken';

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
    });
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { nome, senha } = req.body;

    let query = `SELECT * FROM usuario WHERE nome = "${nome}"`;

    Connect()
        .then((connection) => {
            Query<IUser[]>(connection, query)
                .then((users) => {
                    try {
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
    let query = `SELECT id_usuario, nome FROM usuario`;

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

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting books');

    let { nome, email, senha } = req.body;

    let query = `INSERT INTO usuario (nome, email, senha) VALUES ("${nome}", "${email}", "${senha}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Book created: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all books.');

    let query = `SELECT * FROM usuario`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Retrieved books: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(200).json({
                        message: error.message,
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Closing connection.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(200).json({
                message: error.message,
                error
            });
        });
};

export default { createUser, getUsers, validateToken, register, login, getAllUsers };

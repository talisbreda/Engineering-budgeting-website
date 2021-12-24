create database pi;
use pi;

create table usuario (
	id_usuario int not null auto_increment primary key,
    nome varchar(45),
    email varchar(45),
    senha varchar(255)
);

create table projeto (
	id_projeto int not null auto_increment primary key,
    usuario_fk int,
    titulo_projeto varchar(45),
    lado_a double,
    lado_b double,
    lado_c double,
    lado_d double,
    altura double,
    material_telhado varchar(45),
    cor_telhado varchar(45),
    ondas_telhado int,
    material_parede varchar(45),
    cimento varchar(45),
    tipo_piso varchar(45),
    tamanho_piso int,
    argamassa varchar(45),
    tipo_acabamento varchar(45),
    cor_tinta varchar(45),
    qtd_areia double,
    qtd_brita double,
    foreign key (usuario_fk) references usuario (id_usuario) on delete cascade
);

create table comodo (
	id_comodo int not null auto_increment primary key,
    nome varchar(45),
    projeto_fk int,
    acabamento_fk int,
    lado_a double,
    lado_b double,
    lado_c double,
    lado_d double,
    foreign key (projeto_fk) references projeto (id_projeto) on delete cascade
);

select * from usuario;
select * from projeto;

insert into projeto (usuario_fk, titulo_projeto, lado_a, lado_b, lado_c, lado_d, altura, material_telhado, cor_telhado,
					 ondas_telhado, material_parede, cimento, tipo_piso, tamanho_piso, argamassa, tipo_acabamento,
                     cor_tinta) 
                     values 
                     (1, 'Projeto 1', 12, 12, 12, 12, 3, 'Cerâmica', 'Vinho', 2, 'Bloco de concreto', 'Votoran',
                     'Porcelanato', 30, 'aaa', 'Tinta', 'Verde');
insert into projeto (usuario_fk, titulo_projeto, lado_a, lado_b, lado_c, lado_d, altura, material_telhado, cor_telhado,
					 ondas_telhado, material_parede, cimento, tipo_piso, tamanho_piso, argamassa, tipo_acabamento,
                     cor_tinta) 
                     values 
                     (1, 'Projeto 1', 12, 12, 12, 12, 3, 'Cerâmica', 'Vinho', 2, 'Bloco de concreto', 'Votoran',
                     'Porcelanato', 30, 'aaa', 'Tinta', 'Verde');
insert into projeto (usuario_fk, titulo_projeto, lado_a, lado_b, lado_c, lado_d, altura, material_telhado, cor_telhado,
					 ondas_telhado, material_parede, cimento, tipo_piso, tamanho_piso, argamassa, tipo_acabamento,
                     cor_tinta) 
                     values 
                     (1, 'Projeto 1', 12, 12, 12, 12, 3, 'Cerâmica', 'Vinho', 2, 'Bloco de concreto', 'Votoran',
                     'Porcelanato', 30, 'aaa', 'Tinta', 'Verde');                     
insert into projeto (usuario_fk, titulo_projeto, lado_a, lado_b, lado_c, lado_d, altura, material_telhado, cor_telhado,
					 ondas_telhado, material_parede, cimento, tipo_piso, tamanho_piso, argamassa, tipo_acabamento,
                     cor_tinta) 
                     values 
                     (2, 'Projeto 2', 12, 12, 12, 12, 3, 'Cerâmica', 'Vinho', 2, 'Bloco de concreto', 'Votoran',
                     'Porcelanato', 30, 'aaa', 'Tinta', 'Verde');
insert into projeto (usuario_fk, titulo_projeto, lado_a, lado_b, lado_c, lado_d, altura, material_telhado, cor_telhado,
					 ondas_telhado, material_parede, cimento, tipo_piso, tamanho_piso, argamassa, tipo_acabamento,
                     cor_tinta) 
                     values 
                     (3, 'Projeto 3', 12, 12, 12, 12, 3, 'Cerâmica', 'Vinho', 2, 'Bloco de concreto', 'Votoran',
                     'Porcelanato', 30, 'aaa', 'Tinta', 'Verde');
insert into projeto (usuario_fk, titulo_projeto, lado_a, lado_b, lado_c, lado_d, altura, material_telhado, cor_telhado,
					 ondas_telhado, material_parede, cimento, tipo_piso, tamanho_piso, argamassa, tipo_acabamento,
                     cor_tinta) 
                     values 
                     (4, 'Projeto 4', 12, 12, 12, 12, 3, 'Cerâmica', 'Vinho', 2, 'Bloco de concreto', 'Votoran',
                     'Porcelanato', 30, 'aaa', 'Tinta', 'Verde');
                     

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '161203';
flush privileges;

delete from usuario where id_usuario > 0;

show triggers;
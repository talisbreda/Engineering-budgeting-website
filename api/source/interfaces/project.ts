export default interface IProject {
    id_projeto: number;
    usuario_fk: number;
    parede_fk: number;
    piso_fk: number;
    telhado_fk: number;
    acabamento_fk: number;
    lado_a: number;
    lado_b: number;
    lado_c: number;
    lado_d: number;
    altura: number;
}

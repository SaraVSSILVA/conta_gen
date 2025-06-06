import { colors } from "../Colors";

export abstract class Conta {

    private _numero: number;
    private _agencia: number;
    private _tipo: number;
    private _titular: string;
    private _saldo: number;
    listaContas: any;

    constructor(numero: number, agencia: number, tipo: number, titular: string, saldo: number) {
        this._numero = numero;
        this._agencia = agencia;
        this._tipo = tipo;
        this._titular = titular;
        this._saldo = saldo;
    }

    atualizar(conta: Conta): void {
        let buscarConta = this.buscarNoArray(conta.numero);

        if (buscarConta != null) {
            this.listaContas[this.listaContas.indexOf(buscarConta)] = conta;
            console.log(colors.fg.green, "\nA Conta numero: " + conta.numero+ "foi atualizada com sucesso!", colors.reset);
        }else
        console.log(colors.fg.red, "\nA Conta numero: " + conta.numero + " não foi encontrada!", colors.reset);
        
    }
    buscarNoArray(numero: number): Conta | null {
        throw new Error("Method not implemented.");
    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, "\nA Conta numero: " + numero + " foi apagada com sucesso!", colors.reset);
        }else
        console.log(colors.fg.red, "\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    public get numero() {
        return this._numero;
    }

    public set numero (numero: number) {
        this._numero + numero;
    }

    public get agencia() {
        return this._agencia = this.agencia;
    }

    public set agencia(agencia: number) {
        this._agencia = agencia;
    }

    public get tipo() {
        return this._tipo;
    }

    public set tipo(tipo: number) {
        this._tipo = tipo;
    }

    public get titular() {
        return this._titular;
    }

    public set titular(titular: string) {
        this._titular = titular;
    }

    public get saldo() {
        return this._saldo;
    }

    public set saldo(saldo: number) {
        this._saldo = saldo;
    }

    public sacar(valor: number): boolean {
        
        if (this.saldo < valor) {
            console.log("\n Saldo Insuficiente!");
            return false;
        }

        this._saldo = this._saldo - valor;
        return true;
    }

    public depositar(valor: number): void;
    public depositar(numero: number, valor: number): void;
    public depositar(arg1: number, arg2?: number): void {
        if (typeof arg2 === "number") {
            // depositar(numero, valor)
            let conta = this.buscarNoArray(arg1);

            if (conta != null) {
                conta.depositar(arg2);
                console.log(colors.fg.green,"\nO Deposito na Conta numero: " + arg1 + " foi efetuado com sucesso!", colors.reset);

            } else {
                console.log(colors.fg.red,"\nA Conta numero: " + arg1 + " não foi encontrada!", colors.reset);
            }
        } else {
            // depositar(valor)
            this._saldo = this._saldo + arg1;
        }
    }
    public transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if (contaOrigem.sacar(valor) === true) {
                contaDestino.depositar(valor);
                console.log(colors.fg.green, "\nA Transferência da Conta numero: " + numeroOrigem + " para a Conta numero: " + numeroDestino + " foi efetuada com sucesso!", colors.reset);
            }
        } else {
            console.log(colors.fg.red, "\nA Conta numero: " + numeroOrigem + " e/ou a Conta numero: " + numeroDestino + " não foram encontradas!", colors.reset);
        }
    }

    public visualizar(): void {
        
        let tipo: string = "";

        switch (this._tipo) {
            case 1:
                tipo = "Conta Corrente";
                break;
            case 2:
                tipo = "Conta Poupança";
                break;
        }

        console.log("\n\n*****************************************************");
        console.log("Dados da Conta:");
        console.log("*****************************************************");
        console.log("Numero da Conta: " + this._numero);
        console.log("Agência: " + this._agencia);
        console.log("Tipo da Conta: " + tipo);
        console.log("Titular: " + this._titular);
        console.log("Saldo: " + this._saldo.toFixed(2));
    }
}
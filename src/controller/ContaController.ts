import { colors } from "../util/Colors";
import { Conta } from "../util/model/Conta";
import { ContaRepository } from "../util/repository/ContaRepository";

function tituloSecao(titulo: string) {
    console.log(colors.fg.whitestrong, `\n\n${titulo}\n\n`, colors.reset);
}

export class ContaController implements ContaRepository {
    // Métodos da interface implementados abaixo ou posteriormente

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;

    procurarPorNumero(numero: number): void {
        let buscarConta = this.buscarNoArray(numero);
        
        if (buscarConta != null) {
            buscarConta.visualizar();
        }else
        console.log(colors.fg.red,"\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    listarTodas(): void {
        tituloSecao("Listar todas as Contas");
        for (let conta of this.listaContas){
            conta.visualizar();
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
    console.log(colors.fg.black, "\nA Conta número: " + conta.numero +
                " foi criada com sucesso!", colors.reset);
    }
    atualizar(conta: Conta): void {
        for (let i = 0; i < this.listaContas.length; i++) {
            if (this.listaContas[i].numero === conta.numero) {
                this.listaContas[i] = conta;
                console.log(colors.fg.green, "\nConta atualizada com sucesso!", colors.reset);
                return;
            }
        }
        console.log(colors.fg.red, "\nConta não encontrada para atualização!", colors.reset);
    }
    deletar(numero: number): void {
        const index = this.listaContas.findIndex(conta => conta.numero === numero);
    if (index !== -1) {
        this.listaContas.splice(index, 1);
        console.log(colors.fg.green, `\nA Conta número: ${numero} foi apagada com sucesso!`, colors.reset);
    } else {
        console.log(colors.fg.red, `\nA Conta número: ${numero} não foi encontrada!`, colors.reset);
    }
}
    depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, `\nDepósito de R$ ${valor.toFixed(2)} realizado com sucesso na Conta número: ${numero}!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nA Conta número: ${numero} não foi encontrada!`, colors.reset);
        }
    }
    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem == null) {
            console.log(colors.fg.red, `\nConta de origem número: ${numeroOrigem} não encontrada!`, colors.reset);
            return;
        }
        if (contaDestino == null) {
            console.log(colors.fg.red, `\nConta de destino número: ${numeroDestino} não encontrada!`, colors.reset);
            return;
        }
        if (contaOrigem.sacar(valor)) {
            contaDestino.depositar(valor);
            console.log(colors.fg.green, `\nTransferência de R$ ${valor.toFixed(2)} da Conta ${numeroOrigem} para a Conta ${numeroDestino} realizada com sucesso!`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nSaldo insuficiente na Conta ${numeroOrigem} para transferência!`, colors.reset);
        }
    }

    public sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

    if (conta != null) {

        if (conta.sacar(valor) == true)
        console.log(colors.fg.green,"\nO Saque na Conta numero: " + numero + " foi efetuado com sucesso!", colors.reset);

    }else
    console.log(colors.fg.red,"\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
    }

    /*Métodos Auxiliares*/

    /*Gerar Número da Conta*/
    public gerarNumero(): number {
        return ++ this.numero;
    }

    /*Checa se uma Conta existe*/
    public buscarNoArray(numero: number): Conta | null {

        for (let conta of this.listaContas) {
            if (conta.numero === numero)
                return conta;

        }

        return null;
    }
}

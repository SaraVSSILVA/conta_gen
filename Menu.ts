import readlinesync = require("readline-sync");
import { colors } from './src/util/Colors';
import { Conta } from './src/util/model/Conta';
import { ContaCorrente } from "./src/util/model/ContaCorrente";
import { ContaPoupanca } from "./src/util/model/ContaPoupanca";
import { ContaController } from "./src/controller/ContaController";

export function main() {

    // Instância da Classe ContaController
    let contas: ContaController = new ContaController();

    // Variáveis Auxiliares
    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tiposConta = ['Conta Corrente', 'Conta Poupança'];

    console.log("\nCriar Contas\n");

let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
contas.cadastrar(cc1);

let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
contas.cadastrar(cc2);

let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
contas.cadastrar(cp1);

let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Juliana Ramos", 8000, 15);
contas.cadastrar(cp2);

contas.listarTodas();

    // Objeto da Classe ContaCorrente (Teste)
    const contacorrente: ContaCorrente = new ContaCorrente(2, 123, 1, "Mariana", 15000, 1000);
    contacorrente.visualizar();
    contacorrente.sacar(2000);
    contacorrente.visualizar();
    contacorrente.depositar(1000);
    contacorrente.visualizar();

    //Objeto da Classe ContaPoupanca (Teste)
    const contapoupanca: ContaPoupanca = new ContaPoupanca(3, 123, 2, "Victor", 1000, 10);
    contapoupanca.visualizar();
    contapoupanca.sacar(200);
    contapoupanca.visualizar();
    contapoupanca.depositar(1000);
    contapoupanca.visualizar();

    while (true) {

        tituloSecao("Criar Conta");        exibirMenu();

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 9) {
            tituloSecao("Banco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                tituloSecao("Criar Conta");
                
                console.log("Digite o Número da agência: ");
                agencia = Number(readlinesync.question(""));

                console.log("Digite o Nome do Titular da conta: ");
                titular = readlinesync.question("");

                console.log("Digite o tipo da conta: ");
                tipo = readlinesync.keyInSelect(tiposConta, "", {cancel: false}) + 1;

                console.log("\nDigite o Saldo da conta (R$):  ");
                saldo = readlinesync.questionFloat("");

                switch (tipo) {
                    case 1:
                        console.log("Digite o Limite da Conta (R$): ");
                        limite = readlinesync.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite));
                            break;
                    case 2:
                        console.log("Digite o Dia do aniversário da Conta Poupança: ");
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario));
                        break;
                }        

                keyPress()
                break;
            case 2:
                tituloSecao("Listar todas as Contas");
                contas.listarTodas();
                keyPress();
                break;
            case 3:
                tituloSecao("Consultar dados da Conta - por número");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);                              
               
                keyPress()
                break;
            case 4:
                tituloSecao("Atualizar dados da Conta");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");

                let conta = contas.buscarNoArray(numero);

                if (conta != null) {

                    console.log("Digite o Número da agência: ");
                    agencia = readlinesync.questionInt("");

                    console.log("Digite o Nome do Titular da Conta: ");
                    titular = readlinesync.question("");

                    tipo = conta.tipo;

                    console.log("\nDigite o saldo da conta (R$): ");
                    saldo = readlinesync.questionFloat("");

                    switch (tipo) {
                        case 1: 
                            console.log("Digite o Limite da conta (R$): ");
                            limite = readlinesync.questionFloat("");
                            contas.atualizar(
                                new ContaCorrente(numero, agencia, tipo, titular, saldo, limite));
                            break;
                        case 2:
                            console.log("Digite o Dia do aniversário da Conta Poupança: ");
                            aniversario = readlinesync.questionInt("");
                            contas.atualizar(new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario));
                            break;

                    }
            
                } else {
                    console.log(colors.fg.red, "\nA Conta numero: " + numero + " não foi encontrada!", colors.reset);
                }

                keyPress()
                break;
            case 5:
                tituloSecao("Apagar uma Conta");

                console.log("Digite o número da Conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);

                keyPress()
                break;
            case 6:
                tituloSecao("Saque");

                console.log("Digitar o número da Conta: ");
                numero = readlinesync.questionInt("");

                console.log("\nDigite o valor do saque (R$): ");
                valor = readlinesync.questionFloat("");

                contas.sacar(numero, valor);

                keyPress()
                break;

            case 7:
                tituloSecao("Depósito");

                console.log("Digitar o número da Conta: ");
                numero = readlinesync.questionInt("");

                console.log("\nDigite o valor do Depósito (R$): ");
                valor = readlinesync.questionFloat("");

                contas.depositar(numero, valor);

                keyPress()
                break;

            case 8:
                tituloSecao("Transferência entre Contas");

                console.log("Digitar o número da Conta de Origem: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o numero da Conta de Destino: ");
                numeroDestino = readlinesync.questionInt("");

                console.log("\nDigite o valor do Depósito (R$) : ");
                valor = readlinesync.questionFloat("");

                contas.transferir(numero, numeroDestino, valor);
            
                keyPress()
                break;
            default:
                tituloSecao("Opção Inválida!");

                keyPress()
                break;
        }
    }

}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Sara Silva");
    console.log("Generation Brasil - saras@genstudents.org/saravitoriads@outlook.com");
    console.log("github.com/conteudoGeneratiogit@github.com:SaraVSSILVA/conta_gen.git");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

function exibirMenu(): void {
    console.log(
        colors.bg.white, colors.fg.red,
        "*****************************************************\n" +
        "                                                     \n" +
        "                BANCO DO BRAZIL COM Z                \n" +
        "                                                     \n" +
        "*****************************************************\n" +
        "                                                     \n" +
        "            1 - Criar Conta                          \n" +
        "            2 - Listar todas as Contas               \n" +
        "            3 - Buscar Conta por Numero              \n" +
        "            4 - Atualizar Dados da Conta             \n" +
        "            5 - Apagar Conta                         \n" +
        "            6 - Sacar                                \n" +
        "            7 - Depositar                            \n" +
        "            8 - Transferir valores entre Contas      \n" +
        "            9 - Sair                                 \n" +
        "                                                     \n" +
        "*****************************************************\n" +
        "                                                     ",
        colors.reset
    );
}

main();

function tituloSecao(titulo: string) {
    console.log(colors.fg.whitestrong, `\n\n${titulo}\n\n`, colors.reset);
}

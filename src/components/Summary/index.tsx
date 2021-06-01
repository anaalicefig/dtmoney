import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';
import { Container } from "./styles";
import { formatToReal } from '../../helpers/formatToReal';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {

  const { transactions } = useTransactions();

  const { deposits, total, withdraws} = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImage} alt="Entradas" />
        </header>
        <strong>{formatToReal(deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImage} alt="Saídas" />
        </header>
        <strong>- {formatToReal(withdraws)}</strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImage} alt="Total" />
        </header>
        <strong>{formatToReal(total)}</strong>
      </div>
    </Container>
  )
}
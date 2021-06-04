import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string,
  createdAt: string
}
// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string,
// }
// same ---¬
// type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
// same ---¬
type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;


interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContexData {
  transactions: Transaction[];
  createTransactions: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContexData>(
  {} as TransactionsContexData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransactions(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const {transaction} = response.data;
    
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransactions}}>
      {children}
    </TransactionsContext.Provider>
  );
}
import Head from 'next/head'
import axios from 'axios';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import { useState } from 'react';
import Add from '../components/Add';
import AddButton from '../components/AddButton';

const inter = Inter({ subsets: ['latin'] })

export default function Home({pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if(myCookie.token === process.env.TOKEN) {
    admin = true;
  }
    const res = await axios.get("http://localhost:3000/api/products");
    return {
      props: {
        pizzaList: res.data,
        admin
      }
    }
}

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useState, useEffect} from "react";
import Link from 'next/link'

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
      setPokemon(await resp.json());
    }
    getPokemon();
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon list</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <img
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

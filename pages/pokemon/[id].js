import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Details.module.css'
import React, {useState, useEffect} from "react";
import Link from 'next/link'
import { useSyncExternalStore } from 'react/cjs/react.production.min';

export default function Details() {
    const {query:{ id }} = useRouter();

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function getPokemon() {
        const resp = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
        setPokemon(await resp.json());
    }
    if(id){
        getPokemon();
    }
    }, [id])

    if(!pokemon){
        return null;
    }

    return (<>
        <div>
            <Head>
                <title>{pokemon.name}</title>
            </Head>
            <div>
                <Link href="/">
                    <h3>Back to Home</h3>
                </Link>
            </div>
            <div className={styles.layout}>
                <div>
                    <img
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        alt={pokemon.name}
                    />
                </div>
                <div>
                    <div className={styles.name}>{pokemon.name}</div> 
                    <div className={styles.type}>{pokemon.type.join(", ")}</div> 
                    <table>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map(({name, value}) => (
                                <tr key={name}>
                                    <td className={styles.attributes}>{name}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>)
}
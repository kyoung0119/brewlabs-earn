// import Button from "@components/Button";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalButton } from '@solana/wallet-adapter-react-ui';

import { Button } from "@components/ui/button";
import solanaLogo from '../../../public/images/networks/Solana_logo.png'

const Wallets = () => {
    const { select, wallet, wallets, publicKey, connect, disconnect } = useWallet();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState(null);

    useEffect(() => {
        if (wallet) {
            setSelectedWallet(wallet.adapter.name);
        } else {
            setSelectedWallet(null);
        }
    }, [wallet]);

    const handleConnect = () => {
        if (!wallet) {
            // setModalOpen(true);
        } else if (!publicKey) {
            connect();
        } else {
            disconnect();
        }
    };

    return (
        <>
            {
                (!wallet && !publicKey) ? <WalletModalButton />
                    :
                    <Button onClick={handleConnect}>
                        {!selectedWallet && <Image src={solanaLogo} alt="Solana" width={30} height={30} />}
                        {selectedWallet && <Image src={wallet?.adapter.icon} alt="Wallet" width={30} height={30} />}
                    </Button>
            }

        </>
    )
};

// const styles = {
//     button: {
//         borderRadius: '50%',
//         width: '50px',
//         height: '50px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         // backgroundColor: '#000',
//         border: 'none',
//         cursor: 'pointer',
//     },
// };

export default Wallets;
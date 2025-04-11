/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import { FC, useState, useEffect } from 'react'
import s from './amount.module.scss'
import { SvgSelector } from '../svgSelector'
import { AssetType } from '../../types/assetType'

interface AmountProps {
    value: string
    setValue: (el: string) => void
    selectedValue: AssetType
    disabled?: boolean
    onlyRead?: boolean
    setIsValidAmount?: (el: boolean) => void
    setIsFromAssets: (el: boolean) => void
    isFromAssets: boolean
    setEstimateLoading?: (el: boolean) => void
    estimateLoading?: boolean,
    isModalOpen: boolean,
    setModalOpen: (el: boolean) => void,
    isValidAmount: boolean
}

export const Amount: FC<AmountProps> = ({
    value,
    selectedValue,
    onlyRead = false,
    disabled = false,
    setIsValidAmount,
    setIsFromAssets,
    isFromAssets,
    setEstimateLoading,
    estimateLoading,
    setValue,
    isModalOpen,
    setModalOpen,
    isValidAmount
}) => {
    console.log('isValidAmount in amount', isValidAmount)

    const errorClass = isFromAssets ? !isValidAmount ? s.error : '' : ''
    const handleOpenModal = () => {
        if (onlyRead) {
            setIsFromAssets(false)
            console.log('updateIsFromAssets(false)')
        } else if (!onlyRead) {
            setIsFromAssets(true)
            console.log('updateIsFromAssets(true)')
        }
        setModalOpen(!isModalOpen)
    }
    const thisAsset = isFromAssets !== onlyRead
    const [ animationStyle, setAnimationStyle ] = useState(isModalOpen ? s.modalOpen : s.modalClose)
    useEffect(() => {
        if (thisAsset) {
            setAnimationStyle(isModalOpen ? s.modalOpen : s.modalClose)
        } else if (!thisAsset) {
            setAnimationStyle(s.modalClose)
        }
    }, [ thisAsset, isModalOpen ])

    const validateButton = (amount: string) => {
        const amountValue = parseFloat(amount.replace(',', '.'))

        return (
            /^\d+(\.\d+)?$/.test(String(amountValue))
            && amountValue >= 0.00001
            && amountValue <= 1500000
        )
    }

    useEffect(() => {
        const sanitizedAmount = value.replace(',', '.')
        if (validateButton(sanitizedAmount) && setIsValidAmount) {
            setIsValidAmount(true)
        } else if ((!validateButton(sanitizedAmount)) && setIsValidAmount) {
            setIsValidAmount(false)
        }
    }, [ value, selectedValue ])

    return (
        <div className={s.inner}>
            <div className={s.topWrapper}>
                <p className={s.topTitle}>
                    {onlyRead ? 'To' : 'From' }
                </p>
            </div>
            <button onClick={() => {
                if (!disabled) {
                    handleOpenModal()
                    console.log('open modal')
                }
            }}
            className={`${s.selectBtn} ${s.selectBtnMain} ${animationStyle}`}>
                <div className={s.rowWrapper}>
                    <div className={s.selectBtnInner}>
                        <img src={selectedValue.tokenLogo} alt={selectedValue.token} width={32} height={32} />
                        <div className={s.infoWrapper} >
                            <p className={s.selectBtnToken}>
                                {selectedValue.token}
                            </p>
                            <p className={s.selectBtnToken}>
                                {Number(selectedValue.balance).toFixed(2)}
                            </p>
                        </div>

                    </div>
                </div>

                <SvgSelector id="chevron-swap" />
            </button>

            <div className={s.amountInner}>
                {onlyRead && estimateLoading ? <div className={s.skeleton}></div>
                    : <input
                        value={value}
                        placeholder='0'
                        inputMode="decimal"
                        disabled={onlyRead}
                        pattern="[0-9]*[.,]?[0-9]*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (setEstimateLoading) {
                                setEstimateLoading(true)
                            }

                            let inputValue = e.target.value.replace(/,/g, '.')

                            inputValue = inputValue.replace(/^0+(?!$|\.)/, '')

                            inputValue = inputValue.replace(/[^0-9.]+/, '')

                            inputValue = inputValue.length === 0 ? '0' : inputValue

                            const isValidInput = /^-?\d*\.?\d*$/.test(inputValue)
                            if (isValidInput) {
                                setValue(inputValue)
                            }
                        }} className={`${s.amount} ${errorClass}`}
                    />}
            </div>
        </div>
    )
}

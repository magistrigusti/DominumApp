/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
import { FC, useState } from 'react'
import { Button, IconSelector, Input, Modal, Text, Title } from '@delab-team/de-ui'
import { v1 } from 'uuid'
import WebAppSDK from '@twa-dev/sdk'

import s from './select-assets.module.scss'
import { SvgSelector } from '../svgSelector'
import { AssetType } from '../../types/assetType'

interface SelectTokenProps {
    swapData: AssetType
    setSwapData: (...args: AssetType[]) => void
    tokensData: AssetType[] | undefined
    closeModal: () => void
    isModalOpen: boolean
    setIsModalOpen: (e: boolean) => void
}

export const SelectAsset: FC<SelectTokenProps> = (props) => {
    const TgObj = WebAppSDK

    const [ value, setValue ] = useState<string>('')

    const filteredTokens = props.tokensData?.filter(el => el.token.toLowerCase().includes(value.toLowerCase())) as AssetType[]
    console.log('filteredTokens', filteredTokens)

    return (
        <>
            <div className={s.wrapper}>
                <Modal
                    className={s.modal}
                    isOpen={props.isModalOpen}
                    onClose={() => props.setIsModalOpen(false)}
                    isCloseButton={false}
                >
                    <div className={s.modalTop}>
                        <Button className={s.modalTopButton} onClick={() => {
                            props.closeModal()
                        }}>
                            Close
                        </Button>

                    </div>
                    <Text className={s.modalTitle}>
                        Select token
                    </Text>
                    <div className={s.seleсtWrapper}>
                        <div className={s.searchInner}>
                            <div className={s.searchIcon}>
                                <SvgSelector  id="search-2"  />
                            </div>

                            <Input
                                placeholder='Select token'
                                value={value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                                variant="black"
                                className={`${s.search} ${s.searchHome}`}
                            />
                            {value?.length >= 1 && (
                                <button className={s.searchClear} onClick={() => {
                                    TgObj.HapticFeedback.impactOccurred('medium')
                                    setValue('')
                                }}>
                                    <IconSelector id="x" size='20' color="#8E8E93" />
                                </button>
                            )}
                        </div>

                        <ul className={s.tokensList}>
                            {filteredTokens?.length > 0 ? filteredTokens.map(el => (
                                <div className={s.tokenItem} key={v1()} onClick={() => {
                                    console.log('set swap data', el)
                                    props.setSwapData({
                                        token: el.token,
                                        tokenLogo: el.tokenLogo,
                                        tokenAddress: el.tokenAddress,
                                        decimals: el.decimals,
                                        balance: el.balance
                                    })
                                    props.closeModal()
                                }}>
                                    <div className={s.tokenItemBody}>
                                        <img src={el.tokenLogo} alt="token logo" />
                                        <div className={s.tokenItemInner}>
                                            <div className={s.tokenColumn}>
                                                <Title variant="h6" className={s.tokenItemToken}>
                                                    {el.token}
                                                </Title>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : <Text className={s.noAssets}>Not found</Text>}
                        </ul>
                    </div>

                </Modal>
            </div>

        </>
    )
}

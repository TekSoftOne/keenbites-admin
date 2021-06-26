import { Box, TextField } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { ButtonComponent } from '~/app/components/button-component';
import { useAsyncState } from '~/app/data-services/async-state';
import { TemplateItem } from '../../interfaces';
import { sendMailWithContent } from './send-mail';

type PreviewHtmlItemProps = {
    rawHtml: string;
    templateItem?: TemplateItem;
};
export const PreviewHtmlItem: FC<PreviewHtmlItemProps> = (props) => {
    const [testSendConfirmed, setTestSendConfirmed] = useState<
        number | undefined
    >(undefined);

    const [email, setEmail] = useState('');

    const handleSendTestMail = () => {
        setTestSendConfirmed(new Date().valueOf());
    };

    const sendTestMailAsync = useAsyncState(async () => {
        if (props.templateItem && testSendConfirmed) {
            return sendMailWithContent(props.templateItem, email);
        }
    }, [testSendConfirmed]);

    return (
        <>
            {props.templateItem ? (
                <Box style={{ display: 'flex', flexDirection: 'row' }} my={2}>
                    <TextField
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='Input your email'
                    />

                    <Box ml={2}>
                        <ButtonComponent
                            onPress={handleSendTestMail}
                            disabled={email.length <= 0 ? true : false}
                            name={
                                sendTestMailAsync.state === 'loading'
                                    ? 'Sending...'
                                    : 'Test mail'
                            }
                        />
                    </Box>
                </Box>
            ) : (
                <></>
            )}
            <p
                dangerouslySetInnerHTML={{
                    __html: props.rawHtml,
                }}
            />
        </>
    );
};

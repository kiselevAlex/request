import { NextPage } from "next"
import { useCallback, useEffect, useMemo, useState } from "react";

export interface Data<T> {
    isLoading: boolean;
    data?: T;
    [key: string]: any;
}

type Fetcher<T> = () => Promise<T>;

const withData = <T,>(Page: NextPage<Data<T>>, fetcher: Fetcher<T>) => {
    const Component: NextPage<Data<T>> = ({
        isLoading: _isLoading,
        data: _data,
        ...props
    }) => {
        const [isLoading, setLoading] = useState(_isLoading);
        const [data, setData] = useState(_data);

        const fetchData = useCallback(
            async () => {
                try {
                    setData(await fetcher());
                } catch (e) {
                    console.error('withData.fetchData error', e);
                } finally {
                    setLoading(false);
                }
            },
            [],
        )
        useEffect(() => {
            if (!isLoading) return;

            fetchData();
        }, [isLoading, fetchData]);

        const preparedProps = useMemo(
            () => ({ ...props, isLoading, data }),
            [isLoading, data, props],
        );

        return <Page { ...preparedProps } />
    }

    Component.getInitialProps = async (ctx) => {
        let isLoading = true;
        let fetchedData = undefined;

        const data = Page.getInitialProps ? await Page.getInitialProps(ctx) : {};

        try {
            if (typeof window === 'undefined') {
                fetchedData = await fetcher();
                isLoading = false;
            }
        } catch (e) {
            console.error('withData.getInitialProps error', e);
        }

        return {
            ...data,
            isLoading,
            data: fetchedData,
        }
    }

    return Component;
}

export default withData;
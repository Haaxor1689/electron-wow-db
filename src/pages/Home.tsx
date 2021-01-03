import React, { FC } from 'react';
import { Flex } from '../components/Styled';
import Table from '../components/Table';
import useSqlQuery from '../hooks/useSqlQuery';
import { DB } from '../typings';

const Home: FC = () => {
	const response = useSqlQuery<DB.Conditions[]>(
		'SELECT * FROM `mangos`.`creature_template` WHERE `name` LIKE "%Simone Cantrell%";'
	);
	return (
		<Flex flexDirection="column">
			<Table data={response.data ?? []} />
		</Flex>
	);
};

export default Home;

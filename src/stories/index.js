import React from 'react';

import { storiesOf } from '@storybook/react';
import Calendar from "../components/Calendar/Calendar"

storiesOf("Calendar", module)
    .add("view", () => <Calendar/>  );

import { ReactNode, useState } from 'react';
import { FabProps, SpeedDial as MuiSpeedDial, SpeedDialAction } from '@mui/material';
import { Menu } from '@mui/icons-material';

interface ActionProps {
  label: string;
  icon: ReactNode;
  tooltip?: string;
  tooltipOpem?: boolean;
  onClick: Function;
  fabProps?: FabProps;
}

interface Props {
  icon?: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  actions: ActionProps[];
  index?: number;
}

const SpeedDial = (props: Props) => {
  const { icon = <Menu />, actions = [], direction = 'up', index = 0 } = props;

  const [open, setOpen] = useState(false);

  return (
    <MuiSpeedDial
      ariaLabel=""
      sx={{ position: 'fixed', bottom: 16, right: 16 + index * 64 }}
      icon={icon}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      className="no-print"
      direction={direction}
    >
      {actions.map((action: ActionProps) => {
        const {
          label = '',
          icon,
          tooltip,
          onClick,
          tooltipOpem = undefined,
          fabProps = {}
        } = action;
        return (
          <SpeedDialAction
            key={label}
            icon={icon}
            tooltipTitle={tooltip}
            onClick={() => onClick()}
            tooltipOpen={tooltipOpem}
            FabProps={fabProps}
          />
        );
      })}
    </MuiSpeedDial>
  );
};

export default SpeedDial;

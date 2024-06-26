import * as React from "react"
import { Box, Button, Grid, Typography } from "@mui/material";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { navigate } from "gatsby";

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container className={"footer"}>
        <Grid item xs={12} md={12}>
          <Box className="white-box">
            <div className=" ms-auto">
              <a style={{display: "inline-flex"}} className="d_f" rel="noreferrer" href="https://wa.me/77072532464?text=Добрый%20день,%20у%20меня%20вопрос%20по%20порталу" target="_blank">
                <span className="ico ico-wt"></span>
                Техническая поддержка
              </a>
            </div>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{fontSize: "11px", textAlign: "center"}}>
        <Button sx={{fontSize: "11px"}} onClick={handleClickOpen()}>Версия 1.6.1</Button>
      </Box>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          tooltipOpen={true}
          icon={<LocalPharmacyIcon />}
          tooltipTitle={"Склад"}
          onClick={()=>navigate("/categories")}
        />
        <SpeedDialAction
          tooltipOpen={true}
          icon={<ShoppingCartIcon />}
          tooltipTitle={"Моя заявка"}
          onClick={()=>navigate("/cart")}
          sx={{whiteSpace:"nowrap"}}
        />
      </SpeedDial>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"body"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Список изменений</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
            {/* ToDo 1) в общей заявке сделать возможность выделить некоторые позиции и печатать только их
                ToDo 2) в печатаемой заявке уменьшить отступы в таблице
                ToDo 3) в общей заявке дать возможность редактировать кол-во
            */}
            <Typography variant="subtitle1" gutterBottom component="div">1.6</Typography>
            <Typography variant="body2" gutterBottom>- Добавлена возможность выбрать несколько дней на странице Все заявки для склада</Typography>
            <Typography variant="body2" gutterBottom>- Уменьшены отступы в заявках и добавлена раскраска "зебра"</Typography>
            <Typography variant="subtitle1" gutterBottom component="div">1.5</Typography>
            <Typography variant="body2" gutterBottom>- Добавлена возможность оставлять комментарий к заявке</Typography>
            <Typography variant="body2" gutterBottom>- Уменьшены отступы в печатаемой заявке</Typography>
            <Typography variant="subtitle1" gutterBottom component="div">1.4</Typography>
            <Typography variant="body2" gutterBottom>- [FIX] Сообщение об успешной отправки заявки корректно отображается</Typography>
            <Typography variant="subtitle1" gutterBottom component="div">1.3</Typography>
            <Typography variant="body2" gutterBottom>- На странице списка всех заказов для склада сделан вывод всех новых заявок</Typography>
            <Typography variant="body2" gutterBottom>- На странице списка всех заказов добавлена кнопка "Показать все новые заказы"</Typography>
            <Typography variant="body2" gutterBottom>- Убрано кэширование списка заявок</Typography>
            <Typography variant="subtitle1" gutterBottom component="div">1.2</Typography>
            <Typography variant="body2" gutterBottom>- [FIX] Исправлено отображение только 10 позиций в заявках</Typography>
            <Typography variant="subtitle1" gutterBottom component="div">1.1</Typography>
            <Typography variant="body2" gutterBottom>- Мобильная версия сайта</Typography>
            <Typography variant="body2" gutterBottom>- Уведомление звуковое и визуальное, а также автоматическое отображение новых заявок за текущий день пользователя "Склад"</Typography>
            <Typography variant="subtitle1" gutterBottom component="div">1.0</Typography>
            <Typography variant="body2" gutterBottom>- Отправка заявки на склад пользователем</Typography>
            <Typography variant="body2" gutterBottom>- Просмотр истории своих заявок пользователем</Typography>
            <Typography variant="body2" gutterBottom>- Разделы: Новости, Объявления, События, База знаний</Typography>
            <Typography variant="body2" gutterBottom>- Список всех заявок для пользователя "Склад"</Typography>
            <Typography variant="body2" gutterBottom>- Просмотр, печать, выгрузка заявки конкретного отдела пользователем "Склад"</Typography>
            <Typography variant="body2" gutterBottom>- Формирование и печать общей заявки пользователем "Склад"</Typography>
            <Typography variant="body2" gutterBottom>- Отправка заявок в телеграм бот</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

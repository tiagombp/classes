library(tidyverse)
library(extrafont)
library(lubridate)

mon <- read.csv('monitorias.csv')

mon2 <- mon %>%
  mutate(date = dmy(Data)) %>%
  select(date, qde = X47.00.00) %>%
  mutate(
    week = lubridate::week(date),
    qde = as.difftime(qde, format="%H:%M:%S", units = "hour"),
    dia = as.Date(paste(2023, week, 1, sep="-"), "%Y-%U-%u")) %>%
  group_by(dia) %>%
  summarize(qde_total = sum(qde)) %>%
  filter(!is.na(dia))

labels = data.frame(
  dia = c(
    ymd("2023-06-05"),
    ymd("2023-08-14"),
    ymd("2023-10-16")
  ),
  label = c(
    "Desenvolvimento Web",
    "Interfaces Narrativas",
    "Projeto Final"
  )
)

mon3 <- mon2 %>%
  mutate(label = cut(dia, c(labels$dia, Inf), labels$label)) %>%
  group_by(label) %>%
  summarise(total = sum(qde_total))

labels$total = mon3$total

ggplot(mon2, aes(x = dia, y = qde_total)) +
  geom_col(fill = "hotpink") +
  geom_text(data= labels, aes(
    x = dia, 
    label = paste0(label, " (", total, ")" )), y = 7, hjust = "left", nudge_x = -3, family = "Fira Code", size = 3, fontface = "bold") +
  labs(title = "Horas totais de monitoria por semana",
       subtitle = "MJD 2022/2023 - Data Storytelling", y = NULL, x = NULL) +
  scale_x_date(date_labels = "%B", date_breaks = "1 month") +
  scale_y_continuous(limits = c(0, 8)) +
  theme_minimal() +
  theme(text = element_text(family = "Fira Code"),
        panel.grid.minor.x = element_blank(),
        plot.title = element_text(face = "bold"))

ggsave('monitorias.png', height = 4, width = 8, bg = "white")

mon2$qde_total %>% sum(na.rm = T)

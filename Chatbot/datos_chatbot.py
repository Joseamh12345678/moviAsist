# === IMPORTACIONES ===
import pandas as pd  # Importamos pandas para la manipulación de datos en formato de tablas
import matplotlib.pyplot as plt  # Importamos matplotlib para generar gráficos
import seaborn as sns  # Importamos seaborn para mejorar la visualización gráfica
from wordcloud import WordCloud  # Importamos la librería para generar nubes de palabras
from textblob import TextBlob  # Importamos TextBlob para el análisis de sentimiento
import nltk  # Importamos nltk para procesamiento de lenguaje natural
nltk.download('punkt')  # Descargar el paquete 'punkt' de nltk para tokenización de texto

sns.set(style='whitegrid')  # Establecemos el estilo de los gráficos con fondo blanco y cuadrícula

# === CARGAR ARCHIVO EXCEL ===
file_path = r'C:\Users\cr0_a\Downloads\Chatbot_Transporte_Urbano_Final.xlsx'  # Ruta del archivo de Excel
# Cambia si tienes otro nombre o ruta de archivo

usuarios = pd.read_excel(file_path, sheet_name='Usuarios')  # Cargamos la hoja 'Usuarios' en un DataFrame
operadores = pd.read_excel(file_path, sheet_name='Operadores')  # Cargamos la hoja 'Operadores' en un DataFrame

# === ESTADÍSTICAS GENERALES ===
# Mostramos el total de reportes y consultas para entender el volumen de datos
print("📌 Total de reportes de usuarios:", len(usuarios))
print("📌 Total de consultas de operadores:", len(operadores))
print("\n📍 Principales situaciones reportadas por usuarios:")
print(usuarios['Situación'].value_counts().head(10))  # Mostramos las 10 situaciones más frecuentes de los usuarios
print(operadores.columns)  # Mostramos las columnas del DataFrame 'Operadores' para revisar los datos disponibles

# === GRÁFICA: Top 10 situaciones de usuarios ===
# Creamos un gráfico de barras para visualizar las 10 principales situaciones reportadas por los usuarios
plt.figure(figsize=(10,6))  # Definimos el tamaño de la figura
usuarios['Situación'].value_counts().head(10).plot(kind='bar', color='orange')  # Graficamos las 10 situaciones más comunes
plt.title('Top 10 Situaciones Reportadas por Usuarios')  # Título del gráfico
plt.ylabel('Cantidad')  # Etiqueta del eje Y
plt.xticks(rotation=45)  # Rotamos las etiquetas del eje X para mejorar la legibilidad
plt.grid(True)  # Habilitamos la cuadrícula
plt.tight_layout()  # Ajustamos el diseño para que no se sobrepongan los elementos
plt.show()  # Mostramos el gráfico

# === ANÁLISIS DE SENTIMIENTO EN COMENTARIOS ===
def analizar_sentimiento(texto):  # Función para analizar el sentimiento de un comentario
    return TextBlob(str(texto)).sentiment.polarity  # TextBlob devuelve una polaridad, que es un valor entre -1 (negativo) y 1 (positivo)

# Aplicamos la función de análisis de sentimiento sobre la columna 'Comentario de sugerencia'
usuarios['Sentimiento'] = usuarios['Comentario de sugerencia'].apply(analizar_sentimiento)

# Creamos un histograma para mostrar la distribución de los sentimientos
plt.figure(figsize=(8,5))
plt.hist(usuarios['Sentimiento'], bins=30, color='skyblue', edgecolor='black')  # Histograma de sentimientos
plt.title('Distribución de Sentimientos en Comentarios de Usuarios')  # Título del gráfico
plt.xlabel('Polaridad (de -1 a 1)')  # Etiqueta del eje X
plt.ylabel('Cantidad')  # Etiqueta del eje Y
plt.grid(True)  # Habilitamos la cuadrícula
plt.tight_layout()  # Ajustamos el diseño
plt.show()  # Mostramos el gráfico

# === NUBE DE PALABRAS DE COMENTARIOS ===
# Unimos todos los comentarios en un solo texto largo
texto_completo = ' '.join(usuarios['Comentario de sugerencia'].dropna().astype(str).tolist())
# Generamos la nube de palabras con el texto completo de los comentarios
wordcloud = WordCloud(width=1000, height=500, background_color='white', collocations=False).generate(texto_completo)

# Mostramos la nube de palabras generada
plt.figure(figsize=(15, 7))
plt.imshow(wordcloud, interpolation='bilinear')  # Mostramos la nube de palabras con una interpolación suave
plt.axis('off')  # Quitamos los ejes para mostrar solo la imagen
plt.title('Nube de Palabras - Comentarios de Usuarios')  # Título del gráfico
plt.tight_layout()  # Ajustamos el diseño
plt.show()  # Mostramos el gráfico

# === PIE: CONSULTA vs INCIDENCIA REAL DE OPERADORES ===
# Contamos el número de ocurrencias para cada tipo de consulta
consulta_tabla = operadores['Tipo de Consulta'].value_counts()  # Cambiado a 'Tipo de Consulta'

# Creamos un gráfico de pastel para mostrar la distribución de tipos de consulta
plt.figure(figsize=(6,6))
consulta_tabla.plot.pie(autopct='%1.1f%%', startangle=90, colors=['lightblue','salmon'])  # Graficamos el pastel
plt.title('Distribución de Consultas: Solo consulta vs Situación real')  # Título del gráfico
plt.ylabel('')  # Quitamos la etiqueta del eje Y
plt.tight_layout()  # Ajustamos el diseño
plt.show()  # Mostramos el gráfico

# === OPERADOR: RELACIÓN ENTRE CONSULTA E INCIDENCIA REAL ===
# Agrupamos los datos por 'ID de Empleado' y 'Situación' para contar cuántas veces aparece cada situación
consulta_situacion = operadores.groupby(['ID de Empleado', 'Situación']).size().reset_index(name='Conteo')

# Agrupamos por 'ID de Empleado' para obtener el total de incidencias por operador
total_operadores = consulta_situacion.groupby('ID de Empleado')['Conteo'].sum().reset_index(name='Total')

# Unimos los conteos de situaciones con los totales por operador
consulta_situacion = pd.merge(consulta_situacion, total_operadores, on='ID de Empleado')

# Calculamos el porcentaje de incidencia real para cada situación reportada por operador
consulta_situacion['% Incidencia Real'] = (consulta_situacion['Conteo'] / consulta_situacion['Total']) * 100

# Mostramos los 10 operadores con más porcentaje de incidencia real
top_operadores = consulta_situacion.sort_values('% Incidencia Real', ascending=False).head(10)

print("\n📊 Operadores con más % de incidencia real:")
print(top_operadores[['ID de Empleado', 'Situación', 'Conteo', 'Total', '% Incidencia Real']])

# === RUTA: RELACIÓN ENTRE CONSULTA E INCIDENCIA REAL ===
# Agrupamos los datos por 'Ruta' y 'Situación' para contar cuántas veces aparece cada situación por ruta
consulta_ruta = operadores.groupby(['Ruta', 'Situación']).size().reset_index(name='Conteo')

# Agrupamos por 'Ruta' para obtener el total de incidencias por ruta
total_rutas = consulta_ruta.groupby('Ruta')['Conteo'].sum().reset_index(name='Total')

# Unimos los conteos de situaciones con los totales por ruta
consulta_ruta = pd.merge(consulta_ruta, total_rutas, on='Ruta')

# Calculamos el porcentaje de incidencia real para cada situación reportada por ruta
consulta_ruta['% Incidencia Real'] = (consulta_ruta['Conteo'] / consulta_ruta['Total']) * 100

# Mostramos las 10 rutas con más porcentaje de incidencia real
top_rutas = consulta_ruta.sort_values('% Incidencia Real', ascending=False).head(10)

print("\n📊 Rutas con más % de incidencia real:")
print(top_rutas[['Ruta', 'Situación', 'Conteo', 'Total', '% Incidencia Real']])

# Gráfico de barras para visualizar las incidencias por ruta y situación
plt.figure(figsize=(12, 8))
sns.barplot(data=consulta_ruta, x='Ruta', y='Conteo', hue='Situación', errorbar=None)  # Cambiado de ci=None a errorbar=None
plt.title('Incidencias por ruta')  # Título del gráfico
plt.xlabel('Ruta')  # Etiqueta del eje X
plt.ylabel('Número de incidencias')  # Etiqueta del eje Y
plt.xticks(rotation=45)  # Rotamos las etiquetas del eje X
plt.legend(title='Situación', bbox_to_anchor=(1.05, 1), loc='upper left')  # Leyenda
plt.tight_layout()  # Ajustamos el diseño
plt.show()  # Mostramos el gráfico

# === GRÁFICA DE PASTEL: DISTRIBUCIÓN DE LAS SITUACIONES POR RUTA ===
# Agrupamos los datos por 'Ruta' y 'Situación' y calculamos el porcentaje de incidencia real
ruta_situaciones = consulta_ruta.groupby(['Ruta', 'Situación']).agg({'% Incidencia Real': 'sum'}).reset_index()

# Listamos las primeras 50 rutas para generar gráficos de pastel
rutas_unicas = ruta_situaciones['Ruta'].unique()[:50]  # Seleccionamos las primeras 50 rutas

# Iteramos sobre las rutas y generamos un gráfico de pastel para cada una
for ruta in rutas_unicas:
    # Filtramos los datos de incidencias para la ruta actual
    ruta_top = ruta_situaciones[ruta_situaciones['Ruta'] == ruta]
    
    # Graficamos el gráfico de pastel para esta ruta
    plt.figure(figsize=(8, 8))
    plt.pie(ruta_top['% Incidencia Real'], labels=ruta_top['Situación'], autopct='%1.1f%%', startangle=90, colors=sns.color_palette('Set3', len(ruta_top)))
    plt.title(f'Distribución de incidencias por situación en la ruta: {ruta}')
    plt.axis('equal')  # Asegura que el gráfico sea un círculo
    plt.tight_layout()  # Ajusta el diseño
    plt.show()  # Muestra el gráfico

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Iniciar Chrome
driver = webdriver.Chrome()
driver.get("http://localhost:5173")  # Cambiar por la URL donde se carga el ejercicio

wait = WebDriverWait(driver, 10)

# Esperar a que desaparezca el mensaje de "Cargando ejercicio..."
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "texto-cargando")))

# Esperar que el textarea esté visible
codigo_area = wait.until(EC.presence_of_element_located((By.ID, "codigo")))

# Escribir código de ejemplo
codigo_area.send_keys("print('Hola mundo')")

# Hacer click en el botón "Enviar Respuesta"
driver.find_element(By.CLASS_NAME, "boton-enviar").click()

# Esperar a que aparezca la corrección
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "contenedor-correccion")))

# Verificar resultado del ejercicio
page_text = driver.page_source
if "✔ ¡Respuesta correcta!" in page_text:
    print("✅ Respuesta correcta detectada.")
elif "✘ Respuesta incorrecta" in page_text:
    print("❌ Respuesta incorrecta detectada.")
else:
    print("⚠ No se detectó ningún resultado.")

# Esperar un poco y cerrar
time.sleep(3)
driver.quit()

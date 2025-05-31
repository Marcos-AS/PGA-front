from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Configurar driver
driver = webdriver.Chrome()
driver.get("http://localhost:5173/formulario-creacion")  # Cambiar por la URL donde esté corriendo tu app

# Esperar que el formulario esté disponible
wait = WebDriverWait(driver, 40)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "formulario-curso")))

# rellenar titulo
driver.find_element(By.ID, "titulo").send_keys("prueba python")


# Seleccionar categoría
categorias = Select(driver.find_element(By.ID, "categorias"))
categorias.select_by_value("1")  # Selecciona "Python"

# Rellenar descripción
driver.find_element(By.ID, "descripcion").send_keys("Quiero un curso de Python práctico con proyectos.")

# Seleccionar duración
duracion = Select(driver.find_element(By.ID, "duracion"))
duracion.select_by_visible_text("1 mes")

# Seleccionar nivel
nivel = Select(driver.find_element(By.ID, "nivel"))
nivel.select_by_visible_text("Intermedio")

# Enviar formulario
driver.find_element(By.CSS_SELECTOR, 'input[type="submit"]').click()

# Esperar que cargue el detalle del curso
wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "curso-detalle")))

# Verificar que se renderiza correctamente el contenido
assert "Descripción:" in driver.page_source
assert "Nivel:" in driver.page_source
assert "Duración:" in driver.page_source

print("✅ El curso se creó correctamente y se muestra el detalle.")

# Opcional: cerrar navegador después de unos segundos
time.sleep(3)
driver.quit()

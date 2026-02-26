Copilot Strict Development Rules
Enfoque General

## Antes de hacer cualquier solicitud, quiero que digas:"Siempre saludes.  Di esto:Hola Ramon, estoy buscando la mejor práctica para ti."
Este proyecto debe mantenerse completamente profesional en arquitectura, estructura y calidad de código.
No se permiten atajos ni soluciones improvisadas.

## Readme

Ir generando el README cuando sea necesario - NO olvidar -

 ## Calidad del Código

Siempre indicar al final de cada generación de código el porcentaje o nivel de calidad del código creado.

La escala va de 10 (muy mala calidad) a 100 (máxima calidad profesional).

No generar código experimental ni aproximado.

No dejar comentarios en el código.

Nunca usar el tipo any.

TypeScript debe estar en modo estricto.

## Flujo de Generación

Solo se puede generar un archivo por respuesta.

Nunca generar dos o más archivos al mismo tiempo.

Si se necesita crear varios archivos, generar primero uno.

Después de generar el primer archivo, explicar qué archivo seguirá.

Preguntar explícitamente si puede continuar antes de generar el siguiente.

No asumir que puede avanzar automáticamente.

**Ejemplo correcto:**

Generar Component.tsx.

Explicar que el siguiente archivo será Component.types.ts.

Preguntar si puede continuar.

## Componentes y Archivos


No crear lógica duplicada.

Mantener separación clara de responsabilidades.

No crear archivos innecesarios.

Si un archivo adicional es requerido, justificarlo antes de crearlo.

## Tailwind y Estilos

Usar exclusivamente las variables definidas en global.css.

No usar clases como bg-red-500, text-blue-600, etc.

No usar valores inline.

No usar sintaxis var(--primary).

Solo usa rounded no rounded-md, rounded-lg, etc.

No uses transition ni, transform ni duration en ningun lado.

No text-text-secondary sino text-secondary.

Usar las variables exactamente como están definidas, por ejemplo:
bg-primary-dark

En Tailwind solo usar margin bottom (mb).

No usar margin top (mt).

No usar combinaciones como mp.

No usar padding como reemplazo de margen superior.


No modificar NUNCA el archivo global.css

Explicar qué se quiere cambiar.

Preguntar antes de hacer cualquier cambio.

## Manejo de Errores

Usar únicamente errores que provienen del backend.

No inventar mensajes de error.

No crear errores simulados.

Tipar correctamente las respuestas del backend.

## GitHub Actions y Calidad

El proyecto debe incluir:

GitHub Actions

Linting obligatorio

TypeScript en modo estricto

El código debe pasar lint sin errores.

No ignorar reglas de ESLint.

No usar deshabilitaciones como eslint-disable.

## Arquitectura

User solo Links para navegación interna. y route solo cuando sea necesario

Mantener arquitectura limpia.

Separación clara entre:

UI

Lógica de negocio

Acceso a datos

No mezclar capas.

No acceder directamente al backend desde componentes si existe capa intermedia.

Tipar todo correctamente.

No romper principios SOLID.

Estructura Recomendada del Proyecto

Esta es la estructura base sugerida:

src/
components/
features/
services/
hooks/
types/
utils/
styles/
pages/ o app/

*components: componentes puros reutilizables.*

features: lógica por dominio.

services: llamadas al backend.

hooks: lógica reutilizable.

types: tipos globales.

utils: funciones puras.

styles: configuración y global.css.


NOTA: EL BACKEND NO ESTA LISTO AUN.





**ARQUITECTURA**

Arquitectura del Proyecto


## 1. Enfoque General

Proyecto Frontend que irá a producción y representa una inmobiliaria profesional.
Este proyecto consumirá la API de onOffice - BACKEND aun no implementado -
La arquitectura debe ser escalable, mantenible, segura y preparada para crecimiento.

No se permiten soluciones improvisadas ni temporales.

## 2. Principios Fundamentales

Clean Architecture

Separación estricta de responsabilidades

Código tipado en modo TypeScript estricto

Sin uso de any

Sin hardcodeos

Sin comentarios en el código final

Un archivo por generación

Uso exclusivo de variables definidas en global.css

Uso únicamente de errores provenientes del backend

Nunca inventar mensajes de error

## 3. Arquitectura de Capas

Frontend debe estar dividido en:

UI Layer

Componentes visuales puros.
No contienen lógica de negocio.
No llaman directamente a APIs.

Feature Layer

Contiene la lógica por dominio.
Ejemplo:

properties

leads

users

auth

Cada feature contiene:

components

services

types

hooks

Service Layer

Encargada de:

Llamadas HTTP

Manejo tipado de respuestas

Propagación de errores del backend

Nunca se llama fetch directamente desde un componente.

Core Layer

Configuración global

Cliente HTTP

Interceptores

Manejo centralizado de errores

Helpers globales

## 4. Endpoints

Nunca hardcodear URLs.

Usar variables de entorno.

Centralizar endpoints en un solo archivo de configuración.

Separar entorno de desarrollo, staging y producción.

Ejemplo conceptual:

BASE_API_URL


PROPERTY_ENDPOINT

Nunca escribir rutas manuales dentro de componentes.

## 5. Manejo de Errores

Solo usar errores enviados por el backend.

Tipar correctamente la estructura del error.

No crear errores personalizados falsos.

Manejar estados:

loading

success

error

El frontend solo interpreta y muestra lo que el backend devuelve.

## 6. Seguridad

Este proyecto es una web pública de inmobiliaria sin autenticación de usuarios finales.

No existe módulo de login en el frontend.

Seguridad de Integraciones

La autenticación con sistemas externos como onOffice ocurre exclusivamente en el backend.

Las credenciales externas nunca se exponen al frontend.

El backend actúa como capa intermedia segura entre el cliente y servicios externos.

Las claves y secretos se gestionan únicamente mediante variables de entorno.

Protección contra Bots y Spam

Los formularios de contacto deben incluir protección anti spam.

Debe implementarse validación en backend obligatoria.

Debe existir rate limiting en el backend para evitar abuso.

Preparación para integración con reCAPTCHA u otro sistema similar.

Protección XSS

No usar dangerouslySetInnerHTML.

Sanitizar cualquier contenido dinámico proveniente de APIs.

No renderizar HTML sin validación previa.

Protección contra Inyecciones

Nunca interpolar datos directamente en consultas o estructuras críticas.

Todas las validaciones deben realizarse en backend.

El frontend nunca confía en datos no tipados.

Gestión de Headers y Seguridad HTTP

HTTPS obligatorio en producción.

Uso de headers de seguridad recomendados:

Content-Security-Policy

X-Frame-Options

X-Content-Type-Options

Referrer-Policy


## 7. Cookies y Cumplimiento Legal

Como inmobiliaria en producción:

Banner de cookies obligatorio

Gestión de consentimiento

Separación:

necesarias

analíticas

marketing

No cargar herramientas de tracking antes de consentimiento

Cumplimiento GDPR

## 8. CI/CD

Debe incluir:

GitHub Actions

Pipeline automático

Instalación

Lint

TypeScript check

Build

Test (cuando existan)

Bloquear merge si falla el pipeline

Separar ramas:

main → producción

develop → desarrollo

feature branches

## 9. Calidad del Código

ESLint obligatorio

Prettier consistente

TypeScript strict

Sin console.log en producción

Sin código muerto

Sin duplicaciones

## 10. Performance

Lazy loading donde sea necesario

Code splitting

Optimización de imágenes

Compresión

Minimización automática en build

Evitar renders innecesarios

## 11. SEO (Muy importante para inmobiliaria)

Metadata dinámica por propiedad

Open Graph

Sitemap automático

Robots.txt

URLs limpias

SSR o estrategia SEO compatible

## 12. Escalabilidad

El proyecto debe poder:

Agregar nuevas features sin romper las existentes

Soportar múltiples agentes inmobiliarios

Soportar internacionalización futura

Soportar múltiples idiomas

Preparar estructura para i18n aunque no se implemente desde el día uno.

## 13. Observabilidad

Proyecto profesional debe incluir:

Logging estructurado

Manejo centralizado de errores

Preparación para integración con:

Sentry u otro sistema de monitoreo

Preparación para métricas

## 14. Entornos

Debe existir:

.env.development

.env.staging

.env.production

Nunca subir secretos al repositorio.

## 15. Validación

Validación tanto en frontend como en backend

Tipado compartido si es posible

No confiar solo en frontend

## 16. Deployment

Build optimizado

Variables de entorno seguras

Configuración de dominio

HTTPS obligatorio

Redirección http → https

## 17. Backup y Continuidad

Aunque sea frontend, se debe contemplar:

Versionado

Recuperación rápida

Estrategia de rollback

## 18. Preparación para Futuro

Este proyecto debe estar listo para:

Integrar CRM

Integrar pagos

Integrar mapas

Integrar chat en tiempo real

Integrar portal privado para propietarios

Sin necesidad de reestructurar todo.

Si quieres, ahora podemos hacer la versión aún más técnica con:

Diagrama lógico

Convenciones exactas de naming

Patrón exacto para services

Patrón exacto para manejo de formularios

Patrón exacto para manejo de autenticación

Estrategia de versionado de API


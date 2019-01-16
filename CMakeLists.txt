cmake_minimum_required(VERSION 2.8)
SET (CMAKE_C_FLAGS_INIT "-Wall -std=c11")
project(cquant)

include_directories(${CMAKE_JS_INC})
execute_process(COMMAND node include.js
        WORKING_DIRECTORY  "${CMAKE_SOURCE_DIR}/script"
        OUTPUT_VARIABLE NAPI_INCLUDES)
message(STATUS "NAPI: ${NAPI_INCLUDES}")
include_directories("${NAPI_INCLUDES}/src")
include_directories(${NAPI_INCLUDES})
add_subdirectory(color-quant)
file(GLOB SOURCE_FILES "src/*.cc" "src/*.h")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})


set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
target_link_libraries(${PROJECT_NAME} LibColorQuant)
include_directories("${CMAKE_SOURCE_DIR}/color-quant/src")
include_directories("${CMAKE_SOURCE_DIR}/color-quant/heap/src")


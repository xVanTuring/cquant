cmake_minimum_required(VERSION 2.8)

project(cquant)

include_directories(${CMAKE_JS_INC})
message(STATUS "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api")
include_directories("${CMAKE_SOURCE_DIR}/node_modules/node-addon-api")
add_subdirectory(color-quant)
file(GLOB SOURCE_FILES "src/*.cc" "src/*.h")

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})


set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
target_link_libraries(${PROJECT_NAME} LibColorQuant)


include_directories("${CMAKE_SOURCE_DIR}/color-quant/src")
include_directories("${CMAKE_SOURCE_DIR}/color-quant/heap/src")


cmake_minimum_required(VERSION 2.8)

set(CMAKE_POSITION_INDEPENDENT_CODE ON)

project(cquant)

include_directories(${CMAKE_JS_INC})
execute_process(COMMAND node include.js
        WORKING_DIRECTORY  "${CMAKE_SOURCE_DIR}/script"
        OUTPUT_VARIABLE NAPI_INCLUDES)
message(STATUS "NAPI: ${NAPI_INCLUDES}")
include_directories("${NAPI_INCLUDES}/src")
include_directories(${NAPI_INCLUDES})
add_subdirectory(color-quant)

set(SOURCE_FILES "src/addon.cc" "src/async.cc" "src/async.h")
if(MSVC)
        message(STATUS "It's MSVC, enable win_delay_load_hook")
        set(node_host_binary node)
        set(WIN_DELAY_LOAD_HOOK "src/win_delay_load_hook.cc")
        add_compile_definitions(HOST_BINARY=\"${node_host_binary}${CMAKE_EXECUTABLE_SUFFIX}\")
        add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${WIN_DELAY_LOAD_HOOK})
        set_target_properties(${PROJECT_NAME} PROPERTIES LINK_FLAGS "/DELAYLOAD:${node_host_binary}${CMAKE_EXECUTABLE_SUFFIX}")
else()
        add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})
endif()

set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")



target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})
target_link_libraries(${PROJECT_NAME} LibColorQuant)
include_directories("${CMAKE_SOURCE_DIR}/color-quant/src")
include_directories("${CMAKE_SOURCE_DIR}/color-quant/heap/src")

